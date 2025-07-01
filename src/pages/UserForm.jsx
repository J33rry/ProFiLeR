import AddUser from "@/components/AddUser";
import Button from "@/components/Button";
import React from "react";
import { MdGroupAdd } from "react-icons/md";

function UserForm({ AddForm, setAddForm }) {
    return (
        <div>
            {AddForm && (
                <div className="h-[100vh] w-[100vw]">
                    <AddUser setAddForm={setAddForm} />
                </div>
            )}
            {!AddForm && (
                <Button
                    button="Add New Profile"
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
