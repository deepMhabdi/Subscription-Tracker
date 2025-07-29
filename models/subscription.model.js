import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than 0"]
    },
    currency: {
        type: String,
        required: [true, "Currency is required"],
        enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY'], // Add more currencies as needed
        default: 'INR'
    },
    frequency: {
        type: String,
        required: [true, "Frequency is required"],
        enum: ['daily', 'weekly ', 'monthly', 'yearly'],
        default: 'monthly'
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ['entertainment', 'utilities', 'food', 'health', 'education', 'sports', 'other'],
        default: 'other'
    },
    paymetMethod: {
        type: String,
        required: [true, "Payment method is required"],
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
        default: 'credit_card'
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ['active', 'inactive', 'cancelled'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start date cannot be in the past"
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "Renewal date must be after the start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"],
        index: true
    }
}, { timestamps: true });


//Auto calculate renewal date before saving
subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const frequencyMap = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + frequencyMap[this.frequency]);
    }

    if(this.renewalDate < new Date()) {
       this.status = 'EXPIRED';
    }

    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;