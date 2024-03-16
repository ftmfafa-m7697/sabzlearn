import { setCampaign } from "./funcs/campaign.js"


window.addEventListener('load', () => {

    const campaignPercentBtn = document.querySelector('#campaign-percent-btn')

    campaignPercentBtn.addEventListener('click', event => {
        event.preventDefault()
        setCampaign()
    })
})