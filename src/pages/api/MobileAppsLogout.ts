import Config from './../../models/config/config'
import dbConnect from './../../midleware/mongodb'
import { IsIncludes } from './../../helper/isIncludes'

export default async function handler(req:any, res:any) {
    const { method } = req
    const { raspi_id, mobileAppsCon, raspi_wifi_ssid, raspi_wifi_password, esp32cam_wifi_ssid, esp32cam_wifi_password, created_at, messanggingID } = req.body
    const { uniq_id } = req.query
    
    await dbConnect()

    switch (method) {
        
        
        case 'POST':
            try {
                let raspi_id = req.query.raspi_id || ''
                let messagingID = req?.query?.messagingID || ''

                let queryExe = { raspi_id: IsIncludes(raspi_id)}
                
                let data_config = await Config.find(queryExe).sort({ createdAt: -1 })
                
                
                if (data_config?.length > 0){
                    let multipleMessagingID = data_config?.[0]?.messanggingID?.split(',')
                    console.log(multipleMessagingID)
                    console.log(messagingID)
                    let DeviceInUse = multipleMessagingID?.indexOf(messagingID) > -1
                    if (DeviceInUse){
                        messagingID = multipleMessagingID?.filter((item:any) => item !== messagingID)?.join(',')
                    }
                    
                    await Config.findOneAndUpdate({ raspi_id: IsIncludes(raspi_id) }, { messanggingID: messagingID }, { new: true })
                    res?.status(200).json({ msg: 'berhasil mengambil data', data: data_config })
                }else{
                    res.status(200).json({ msg: 'data tidak ditemukan' })
                }

            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}