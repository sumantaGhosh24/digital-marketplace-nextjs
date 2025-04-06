import CreateCategoryForm from "../_components/create-category-form";

export const metadata = {
  title: "Create Category",
};

const CreateCategory = () => {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <div className="min-w-[60%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <CreateCategoryForm />
      </div>
    </div>
  );
};

export default CreateCategory;
