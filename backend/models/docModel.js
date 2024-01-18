import mongoose from 'mongoose';

const docSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false,
        required: true
    },
    data: {
        type: String,
    }
});

const Doc = mongoose.model('Doc', docSchema);

export default Doc;
