import Workshop from '../models/Workshop.js';

export const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find()
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ message: "שגיאה בשליפת הנתונים מהמסד" });
  }
};

export const createWorkshop = async (req, res) => {
  const { title, price, description, city, category, image } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({ message: "שם הסדנה חייב להכיל לפחות 3 תווים" });
  }
  if (!price || Number(price) <= 0) {
    return res.status(400).json({ message: "המחיר חייב להיות מספר חיובי" });
  }
  if (!description || description.trim().length < 10) {
    return res.status(400).json({ message: "תיאור הסדנה קצר מדי" });
  }

  try {
    const newWorkshop = new Workshop({
      ...req.body,
      createdBy: req.user.userId 
    });

    const savedWorkshop = await newWorkshop.save();
    res.status(201).json(savedWorkshop);
  } catch (err) {
    console.error("Error in createWorkshop:", err);
    res.status(400).json({ message: "נתונים לא תקינים, יצירת הסדנה נכשלה" });
  }
};

export const updateWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);

    if (!workshop) {
      return res.status(404).json({ message: "הסדנה לא נמצאה" });
    }

    if (workshop.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "אין לך הרשאה לעדכן סדנה שלא יצרת" });
    }

    const updatedWorkshop = await Workshop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedWorkshop);
  } catch (err) {
    res.status(400).json({ message: "עדכון הסדנה נכשל" });
  }
};

export const getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id).populate('createdBy', 'username');
    if (!workshop) return res.status(404).json({ message: "הסדנה לא נמצאה" });
    res.json(workshop);
  } catch (err) {
    res.status(500).json({ message: "שגיאה בחיפוש הסדנה" });
  }
};

export const deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);

    if (!workshop) {
      return res.status(404).json({ message: "הסדנה למחיקה לא נמצאה" });
    }

    if (workshop.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "אין לך הרשאה למחוק סדנה שלא יצרת" });
    }

    await workshop.deleteOne();
    res.json({ message: "הסדנה נמחקה בהצלחה" });
  } catch (err) {
    res.status(500).json({ message: "מחיקת הסדנה נכשלה" });
  }
};

export const getMyWorkshops = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "משתמש לא מזוהה, אנא התחבר מחדש" });
    }
    const workshops = await Workshop.find({ createdBy: req.user.userId }).sort({ createdAt: -1 });
    res.json(workshops);
  } catch (err) {
    console.error("Error in getMyWorkshops:", err);
    res.status(500).json({ message: "שגיאה בשליפת הסדנאות שלך" });
  }
};