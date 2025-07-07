import AddUser from "@/components/AddUser";

import React from "react";

function UserForm({ AddForm, setAddForm }) {
    return (
        <div>
            {AddForm && (
                <div className="fixed top-[10vh] left-[20vw] md:top-[10%] md:left-[30%] lg:top-[10%] lg:left-[40%]">
                    <AddUser setAddForm={setAddForm} AddForm={AddForm} />
                </div>
            )}
        </div>
    );
}

export default UserForm;
