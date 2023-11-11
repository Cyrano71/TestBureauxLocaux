import { useLocation } from "react-router-dom";
import ItemForm from "../components/ItemForm";

function UpdateItemPage() {
  const location = useLocation();
  const { title, addresse, transaction_type, realty_type } = location.state;
  return (
    <ItemForm
      method="put"
      titleDefaultValue={title}
      addresseDefaultValue={addresse}
      transaction_typeDefaultValue={transaction_type}
      realty_typeDefaultValue={realty_type}
    />
  );
}

export default UpdateItemPage;
