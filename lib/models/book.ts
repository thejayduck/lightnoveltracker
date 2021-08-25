import mongoose, { Schema, Types } from 'mongoose'

export interface IVolume {
    cover_url: string,
    chapters: number,
    extras: number,
}

export interface ISimpleBook {
    _id: Types.ObjectId,
    title_english?: string,
    title_romanized?: string,
    title_native: string,
    description: string,
    author: string,
    cover_url?: string,
    banner_url?: string,
    release_status: string,
    start_date: Date,
    end_date: Date,
}

export interface IBook extends ISimpleBook {
    volumes: [IVolume]
}

export interface ISubmitBook extends IBook {
    submitted_by: Schema.Types.ObjectId,
    denied: boolean,
}

const volumeSchema = new mongoose.Schema({
    cover_url: {
        type: String,
        required: true,
    },
    chapters: {
        type: Number,
        required: true,
    },
    extras: {
        type: Number,
        required: true,
    },
});

const bookSchemaDef = {
    title_english: String,
    title_romanized: String,
    title_native: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    cover_url: String,
    banner_url: String,
    release_status: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    volumes: {
        type: [volumeSchema],
        required: true,
    }
};
const bookSchema = new mongoose.Schema<IBook>(bookSchemaDef, { timestamps: true });

const submitBookSchema = new mongoose.Schema<ISubmitBook>({
    ...bookSchemaDef,
    submitted_by: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    denied: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });

const Book: mongoose.Model<IBook & mongoose.Document> = mongoose.models.Book || mongoose.model('Book', bookSchema);
const BookSubmission: mongoose.Model<ISubmitBook & mongoose.Document> = mongoose.models.BookSubmission || mongoose.model('BookSubmission', submitBookSchema);

export { Book, BookSubmission };