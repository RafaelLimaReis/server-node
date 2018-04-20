const winston = require('winston');

module.exports = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            colorize: true
        })
    ]
});

/**
 * Niveis para setar log
 * 
 * info     ->   verde
 * warn     ->   amarelo
 * error    ->   vermelho
 */