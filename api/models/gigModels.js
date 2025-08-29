import { model, Schema } from "mongoose";

// Belge şeması

// Fiverr'da yayımlanan her bir iş(gig) her mongo verisinde olduğu gibi birer döküman yani belgedirler.

// Mongoose'un Schema özelliğini kullanarak bu belgenin sahip olması gereken verileri belirtebiliyoruz.

const gigSchema = new Schema(
    {
        user: {
            // obje referansı, ID olarak tutulur ama kullanıcıya gönderileceği zaman hemen gönderilmeden önce asıl verilerle değiştirilebilir.

            type: Schema.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            // trim => yazının başında ve sonunda boşluk varsa kırpar
            trim: true
        },

        description: {
            type: String,
            required: true,
            minLength: [15],
            maxLength: [500]
        },

        reviewCount: {
            type: Number,
            default: 0
        },

        starCount: {
            type: Number,
            default: 0
        },

        category: {
            type: String,
            required: true
        },

        coverImage: {
            type: String,
            required: true,
            default: "https://raw.githubusercontent.com/Abdurrahman-Subh/mdx-blog/main/images/logo-fiverr.png"
        },

        images: {
            type: [String],
            required: true
        },

        packageTitle: {
            type: String,
            required: true,
        },

        packageDescription: {
            type: String,
            required: true
        },

        packagePrice: {
            type: Number,
            required: true
        },

        packageFeatures: {
            type: [String],
            required: true
        },

        packageDuration: {
            type: Number,
            required: true
        },

        packageRevisions: {
            type: Number,
            required: true
        }
    },

    {
        timestamps: true, // => oluşturulma ve güncellenme tarihlerini otomatik ekler ve tutar.
    }
)


export const Gig = model("Gig", gigSchema);