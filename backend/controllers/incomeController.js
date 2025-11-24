const XLSX = require ("xlsx");
const User = require ("../models/User");
const Income = require ("../models/Income");

//Add Income
exports.addIncome = async (req, res) => {
    const userId = req.user._id;

    try{
        const { icon, source, amount, date } = req.body;    

        //validation check for missing fields
        if(!source || !amount || !date ){
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
}
}
//Get All Income
exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.json(incomes);
    }catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

//Delete Income
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete( req.params.id );
        res.json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

//Download Income as Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        //prepare data for excel
        const data = incomes.map((item) => ({

            Source: item.source,
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

