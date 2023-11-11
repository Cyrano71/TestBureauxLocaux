import ItemForm from "../components/ItemForm";

function NewItemPage() {
  return (
    <ItemForm
      method="post"
      titleDefaultValue="My amazing office"
      addresseDefaultValue="st germain des près"
      transaction_typeDefaultValue="rental"
      realty_typeDefaultValue="office"
    />
  );
}

export default NewItemPage;
