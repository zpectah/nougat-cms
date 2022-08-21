export const getToken = (length: number = 12) => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
export const getTimestamp = () => Math.round(new Date().getTime()/1000);

export const getRandomString = (length: number = 16, type: string = 'all') => {
    const subs = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        number: '0123456789',
        special: '_-.',
    };
    const get_string = () => {
        let string = subs.uppercase + subs.lowercase + subs.number + subs.special;
        switch (type) {
            case 'uppercase':
                string = subs.uppercase;
                break;
            case 'lowercase':
                string = subs.lowercase;
                break;
            case 'number':
                string = subs.number;
                break;
            case 'special':
                string = subs.special;
                break;
        }
        return string;
    };
    let text = '';
    const possible = get_string();
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const transformString = (
    input: string,
    method: 'empty-space' | 'empty-to-dash' | 'empty-to-dot',
): string => {
    let output: string;

    switch (method) {

        case 'empty-space':
            output = input.split(' ').join('');
            break;

        case 'empty-to-dash':
            output = input.split(' ').join('-');
            break;

        case 'empty-to-dot':
            output = input.split(' ').join('.');
            break;

    }

    return output;
};

export const getTwoDecimal = (number: number) => {
    let string = String(number);
    if (Number(number) <= 9) string = '0' + '' + number;

    return String(string);
};

export const truncateText = (input: string, length: number = 500, end: string = '…') => {
    if (input) {
        let shouldTruncate = input.length >= length;
        let truncated = shouldTruncate ? input.substring(0, length) : input;
        let rest = shouldTruncate ? input.substring(length) : null;
        if (shouldTruncate) {
            return [truncated + end, rest];
        } else {
            return [truncated];
        }
    } else {
        return null;
    }
};

export const truncateFileName = (fileName: string, length: number = 10, separator: string = '…') => {
    let ext = fileName
        .substring(fileName.lastIndexOf('.') + 1, fileName.length)
        .toLowerCase();
    let name = fileName.replace('.' + ext, '');
    if (name.length <= length) {
        return fileName;
    }
    name = name.substr(0, length) + (fileName.length > length ? separator : '');
    return name + '.' + ext;
}

