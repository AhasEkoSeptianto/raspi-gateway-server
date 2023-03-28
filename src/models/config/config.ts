import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var config = new Schema({
    raspi_id: {
        type: String,
        required: true
    },
    mobileAppsCon: {
        type: String,
    },
    raspi_wifi_ssid: {
        type: String
    },
    raspi_wifi_password: {
        type: String
    },
    esp32cam_wifi_ssid:{
        type: String
    },
    esp32cam_wifi_password:{
        type: String
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
});

mongoose.models = {};
var Config = mongoose.model('raspi_config', config);

export default Config;