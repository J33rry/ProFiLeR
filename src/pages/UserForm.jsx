import AddUser from "@/components/AddUser";
import Button from "@/components/Button";

import React from "react";
import { MdGroupAdd } from "react-icons/md";

function UserForm({ AddForm, setAddForm }) {
    return (
        <div>
            {AddForm && (
                <div className="fixed top-[10vh] left-[20vw] md:top-[10%] md:left-[30%] lg:top-[10%] lg:left-[40%]">
                    <AddUser setAddForm={setAddForm} AddForm={AddForm} />
                </div>
            )}
            {!AddForm && (
                <Button
                    button="Add Profile"
                    link="/addUser"
                    buttonIcon={<MdGroupAdd />}
                    AddForm={AddForm}
                    setAddForm={setAddForm}
                />
            )}
        </div>
    );
}

export default UserForm;
