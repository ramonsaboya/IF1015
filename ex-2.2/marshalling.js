const _opStrToInt = {
    "+": 0x0,
    "-": 0x1,
    "*": 0x2,
    "/": 0x3,
};
const _opIntToStr = {
    0x0: "+",
    0x1: "-",
    0x2: "*",
    0x3: "/",
};

function marshallExpr(data) {
    const input = data.split(" ");
    const opStr = input[0];
    const x1 = parseInt(input[1]);
    const x2 = parseInt(input[2]);

    if (!_opStrToInt.hasOwnProperty(opStr)) {
        throw new Error(`Invalid operator: ${opStr}`);
    }
    const op = _opStrToInt[opStr]

    const buf = Buffer.allocUnsafe(1+4+4);
    buf.writeUInt8(op);
    buf.writeInt32BE(x1, 1);
    buf.writeInt32BE(x2, 5);
    return buf;
}

function marshallResult(data) {
    const bufSize = data.success ? 1+4 : 2;
    const buf = Buffer.allocUnsafe(bufSize);
    buf.writeUInt8(data.success ? 1 : 0);

    if (data.success) {
        buf.writeInt32BE(data.value, 1);
    } else {
        buf.writeUInt8(data.error, 1);
    }

    return buf;
}

function unmarshallExpr(buf) {
    const opInt = buf.readUInt8(0);
    const x1 = buf.readInt32BE(1);
    const x2 = buf.readInt32BE(5);

    if (!_opIntToStr.hasOwnProperty(opInt)) {
        throw new Error(`Invalid operator: ${opInt}`);
    }
    const op = _opIntToStr[opInt]

    return `${op} ${x1} ${x2}`;
}

function unmarshallResult(buf) {
    const success = buf.readUInt8();

    if (success == 0x1) {
        return {
            success: true,
            value: buf.readInt32BE(1),
        }
    } else {
        return {
            success: false,
            error: buf.readUInt8(1),
        }
    }
}

module.exports = {
    marshallExpr,
    marshallResult,
    unmarshallExpr,
    unmarshallResult,
};
