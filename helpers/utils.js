const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const {toString} = require('qrcode');
const {readFileSync, writeFileSync} = require('fs');
const { table } = require('console');

const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

const executeQueryOne = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) return reject(err);
            if (result.length === 0) resolve(null);
            resolve(result[0]);
        });
    });
}

const createToken = (user) => {
    const obj = {
        Id: user.id_user,
        userRole: user.role,
        expiresAt: dayjs().add(1000, 'hours').unix()
    }
    return jwt.sign(obj, process.env.JWT_TOKEN);
}

const createTokenTable = (tableId) => {
    const obj = {
        Id: tableId.id_table,
        expiresAt: dayjs().add(1000, 'hours').unix()
    }
    return jwt.sign(obj, process.env.JWT_TOKEN);
}

/// creamos QR 
const newQR = (tableId) => {
    const Print=msg=>console.log(msg);

    const token = createTokenTable(tableId);

    const url = `http://APP-BAR/${token}`

    const QR = toString(
        url,
        {
            type: 'svg' /// cambiar a 'svg'
        },
        (err, data)=> {
            if(err) return Print(`Ocurrio un error: ${err}`)
            let web = readFileSync ('./template.html', {encoding: 'utf-8'}).replace('[QR CODE]', data)
            let position = web.indexOf('<svg')+5

            let positionData = data.indexOf('<svg>')+5
        
            web = `${web.substring(0,position)} width="300" height="300" ${web.substring(position, web.length)}`

            const dataSice = `${data.substring(0,positionData)}  ${data.substring(positionData, data.length)}`

            writeFileSync('./index.html', web, {encoding: 'utf-8'})
            require('child_process').exec(`start chrome  ${process.env.URL_QR}`)

            return dataSice        
        }    
    )
    return QR   
}

module.exports = {
    executeQuery, executeQueryOne, createToken, newQR
}