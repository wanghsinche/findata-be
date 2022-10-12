import './console-re'
export async function manageSubscriptionStatusChange(
    subscriptionId: string,
    customerId: string,
    createAction = false
) {
    console.re.log('manageSubscriptionStatusChange ',subscriptionId, customerId, createAction)
    return true
}