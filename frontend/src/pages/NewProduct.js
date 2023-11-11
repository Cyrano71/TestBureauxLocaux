import EventForm from "../components/ProductForm";

function NewProductPage() {
  return (
    <EventForm
      method="post"
      titleDefaultValue="My amazing office"
      addresseDefaultValue="st germain des près"
      transaction_typeDefaultValue="rental"
      realty_typeDefaultValue="office"
    />
  );
}

export default NewProductPage;
