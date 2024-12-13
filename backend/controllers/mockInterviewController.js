const MockInterview = require('../models/mockInterview');
const User = require('../models/User');

exports.createMock = async (req, res) => {
    const { jobPosition, jobDesc, jobExperience } = req.body;
    const userId = req.user._id;

    try {
        const mockInterview = new MockInterview({
            jobPosition,
            jobDesc,
            jobExperience,
            createdBy: req.user._id,
        });

        await mockInterview.save();

        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { mockIds: mockInterview._id } },
            { new: true }
        );
        res.status(200).json(mockInterview);
    } catch (error) {
        return res.status(400).send({
            error: true,
            message: error.message,
        })
    }
}

exports.deleteMock = async (req, res) => {
    const { mockId } = req.params;
    const userId = req.user._id;

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { mockIds: mockId } },
            { new: true }
        )
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const mock = await MockInterview.findByIdAndDelete(mockId);
        if (!mock) {
            return res.status(404).json({
                message: 'Mock not found'
            })
        }

        return res.status(200).json({ message: 'MockInterview deleted' });
    }catch(error){
        return res.status(400).send({
            error: true,
            message: error.message,
        })
    }
}

exports.getMock = async (req, res) => {
    const userId = req.user._id;
    try {
        const mock = await MockInterview.find({createdBy: userId})
            .sort({createdAt: -1});

        res.status(200).json(mock);
    }catch(error){
        return res.status(400).send({
            error: true,
            message: error.message,
        })
    }
}

