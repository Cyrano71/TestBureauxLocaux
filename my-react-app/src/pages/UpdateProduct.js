import { useLocation } from "react-router-dom";
import EventForm from "../components/ProductForm";

function UpdateProductPage() {
  const location = useLocation();
  const { title, addresse, transaction_type, realty_type } = location.state;
  return (
    <EventForm
      method="put"
      titleDefaultValue={title}
      addresseDefaultValue={addresse}
      transaction_typeDefaultValue={transaction_type}
      realty_typeDefaultValue={realty_type}
    />
  );
}

export default UpdateProductPage;
