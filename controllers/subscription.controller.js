import Subscription from "../models/subscription.model.js"
import {workflowClient} from "../config/upstach.js"


export const createSubscription = async (req, res, next)=> {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        await workflowClient.trigger({
            url: `${process.env.SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json'
            },
            retries: 0,
        })

        res.status(201).json({success: true, data: subscription})
    } catch (error) {
        next(error)
    }
}

export const getUserSubscription = async (req, res, next) => {
    try {
        if (req.user._id  != req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }
        const subscription = await Subscription.find({user: req.params.id});

        res.status(200).json({success: true, data: subscription})

    } catch (error) {
        next(error)
    }
}
