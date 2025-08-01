import { Client as WorkflowClient } from '@upstash/workflow';

import {QSTASH_TOKEN, QSTASH_URL} from './env.js'

export const workflowClient = new WorkflowClient({
    baseurl: QSTASH_URL,
    token: QSTASH_TOKEN
});    