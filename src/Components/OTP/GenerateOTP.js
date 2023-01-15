
const minValue = 1111

const maxValue = 9999

const GenerateOTP = () => {
    return new Promise((Success, Failed) => {
        let OTP = Math.floor(Math.random() * (maxValue - minValue) + minValue)
        Success(OTP)
    })
}


export default GenerateOTP