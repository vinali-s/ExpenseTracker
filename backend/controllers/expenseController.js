const XLSX = require ("xlsx");
const Expense = require ("../models/Expense");

//Add Expense
exports.addExpense = async (req, res) => {
    const userId = req.user._id;

    try{
        const {icon, category, amount, date } = req.body;    

        //validation check for missing fields
        if(!category || !amount || !date ){
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
}
}
//Get All Expense
exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    }catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

//Delete Expense
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete( req.params.id );
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

//Download Expense as Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        //prepare data for excel
        const data = expense.map((item) => ({

            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Income");
        XLSX.writeFile(wb, "Income_details.xlsx");
        res.download("Income_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

