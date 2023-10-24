const getPaymentByUser = async (req, res) => {
    // const { userId } = req;
    const { userId } = req.params
    // ADD PAYMENT API CALL LATER 
    
    res.status(200).json({
      message: "PAYMENT_COMPLETED",
    })
}

module.exports = { getPaymentByUser };