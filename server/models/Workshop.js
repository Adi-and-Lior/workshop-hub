import mongoose from 'mongoose';

const WorkshopSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'חובה להזין שם לסדנה'], 
    minlength: [3, 'שם הסדנה חייב להכיל לפחות 3 תווים'],
    trim: true // מסיר רווחים מיותרים מהצדדים
  },
  price: { 
    type: Number, 
    required: [true, 'חובה להזין מחיר'], 
    min: [0, 'המחיר לא יכול להיות שלילי'] 
  },
  description: { 
    type: String, 
    required: [true, 'חובה להזין תיאור'],
    minlength: [10, 'התיאור חייב להכיל לפחות 10 תווים'],
    trim: true 
  },
  image: { 
    type: String, 
    default: 'https://picsum.photos/400/300' 
  },
  city: { 
    type: String, 
    required: [true, 'חובה לציין עיר'],
    trim: true 
  },
  difficulty: { 
    type: String, 
    enum: {
      values: ['beginner', 'intermediate', 'advanced'],
      message: '{VALUE} אינה רמת קושי תקינה'
    },
    default: 'beginner' 
  },
  category: { 
    type: String, 
    required: [true, 'חובה לבחור קטגוריה'],
    trim: true 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Workshop', WorkshopSchema);