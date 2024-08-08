export default function InformationUSer(){
    return (<>
    <div>
        <form action="" method="post">
        <div className="">
                <label htmlFor="">نوع الحساب</label>
                <div>
                      <input type="radio" name="type" value="Employer" id="Employer" />
                <label htmlFor="Employer">مشتري: هل انت صاحب مشروع او مشتري او تبيع الخدمات</label>
                </div>
                <div>
                     <input type="radio" name="type" value="Freelancer" id="Freelancer" />
                <label htmlFor="Freelancer">مستقل: هل انت  منف المشاريع او مشتري او تبيع الخدمات</label>
                </div>
              
               


            </div>
            <div>
                <label htmlFor="">التخصص</label>
                <input type="text" name="" id="" />
            </div>
            <div>
                <label htmlFor="">المسمي الوظيفي</label>
                <input type="text" name="" id="" />
            </div>
            <div>
                <label htmlFor="">المهارات</label>
                <input type="text"  multiple name="" id="" />
            </div>
            <div>
                <label htmlFor="">نبذة عني</label>
                <input type="text"  multiple name="" id="" />
            </div>
        </form>


    </div>
    
    
    </>)
}