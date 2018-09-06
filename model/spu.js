const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.spu = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId
    },
    pid: Number,
    spuId: Number,
    supplierId: Number,
    prodName: String,
    quoteId: Number,
    quoteType: String,
    sceneType: String,
    questions: Array,
    createTime: {
        type: Date,
        default: Date.now,
        index: true
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});












