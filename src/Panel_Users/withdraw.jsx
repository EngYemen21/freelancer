export  function Withdraw(){
    const [selectedMethod, setSelectedMethod] = useState('');
    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
      };
    return(<>
    <div>
        <div>
            <p></p>
        </div>
        <div>
            <form action="">
                <div>
                     <label htmlFor="">المبلغ</label>
                <input type="text" placeholder="المبلغ" name="amount" />
                </div>
                <div className="mt-4">
      <label htmlFor="paymentMethod" className="block font-medium text-gray-700">
        اختار طريقة السحب
      </label>
      <select
        id="paymentMethod"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        value={selectedMethod}
        onChange={handleMethodChange}
      >
        <option value=""> اختيار طريقة السحب </option>
        <option value="creditCard">نقطة حاسب </option>
        <option value="paypal">وان كاش</option>
        <option value="bankTransfer"> النجم</option>
      </select>
    </div>
                <div>
                     <label htmlFor=""> الغرض</label>
                <input type="text" placeholder="السبب" name="reason" />
                </div>

                <div>
                <input type="submit"  value="إرسال"  />
                </div>
               
            </form>
        </div>
    </div>
    </>)
}