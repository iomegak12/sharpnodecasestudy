const DELIMITER = ', ';
const NO_OF_TRAIL_CHARS = 2;
const START_POS = 0;

const INVALID_ARGUMENTS = 'Invalid Argument(s) Specified!';

class ObjectFormatter {
    static format(obj) {
        if(!obj) {
            throw new Error(INVALID_ARGUMENTS);
        }

        let message = '';

        for(let propertyIndex in obj) {
            if(typeof obj[propertyIndex] !== 'function') {
                message += `${obj[propertyIndex]}${DELIMITER}`;
            }
        }

        message = message.substr(START_POS, message.length - NO_OF_TRAIL_CHARS);

        return message;
    }
}

export {
    ObjectFormatter
};
