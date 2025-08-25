import { model, Schema } from "mongoose";

// Kullanıcı şeması oluştur
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Lütfen kullanıcı adı alanını doldurunuz"],
      unique: [
        true,
        "Bu isimde bir kullanıcı mevcuttur.Lütfen farklı bir kullanıcı adı seçiniz.",
      ],
    },
    email: {
      type: String,
      required: [true, "Lütfen mail alanını doldurunuz"],
      unique: [
        true,
        "Bu mail adresine kayıtlı bir kullanıcı mevcuttur.Lütfen farklı bir mail adresi seçiniz.",
      ],
    },
    password: {
      type: String,
      required: [true, "Lütfen şifre alanını doldurunuz"],
    },
    photo: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/574/369/png-transparent-avatar-computer-icons-user-random-icons-purple-blue-heroes.png",
    },
    country: {
      type: String,
      required: [true, "Lütfen ülke alanını doldurunuz."],
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Number,
      // required: [true, "Lütfen telefon numarası alanını doldurunuz."],
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);