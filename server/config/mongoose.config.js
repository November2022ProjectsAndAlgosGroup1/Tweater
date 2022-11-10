const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/machinedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log('Successfully connected to MachineDB')
}).catch((err) => {
    console.log(err)
})