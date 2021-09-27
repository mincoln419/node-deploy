const {createLogger, format, transports, info} = require('winston');



const date = new Date();
const year = date.getFullYear();
const month = ("0"+(1+date.getMonth())).slice(-2);
const day = ("0"+date.getDate()).slice(-2);
const logDate = year + month + day;
const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports:[
        new transports.File({filename: './log/combined.log' + logDate}),
        new transports.File({filename: './errlog/error.log' + logDate, level:'error'})
    ]
});

if(process.env.NODE_ENV !== 'production'){
    logger.add(new transports.Console({format:format.simple()}));
}

module.exports = logger;