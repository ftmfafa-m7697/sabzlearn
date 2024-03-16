import { getToken, showSwal } from '../../funcs/utils.js'

const setCampaign = async () => {
    const campaingPercentInputElem = document.querySelector('#campaign-percent-input')

    const newCampaignInfos = {
        discount: campaingPercentInputElem.value.trim()
    }

    const res = await fetch(`http://localhost:4000/v1/offs/all`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(newCampaignInfos)
    })

    if (res.ok) {
        showSwal(
            "کمپین جدید با موفقیت ست شد",
            "success",
            "خیلی هم عالی",
            () => {}
        )
    }

}

export {
    setCampaign
}