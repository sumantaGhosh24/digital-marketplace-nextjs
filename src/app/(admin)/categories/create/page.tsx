import CreateCategoryForm from "../_components/create-category-form";

export const metadata = {
  title: "Create Category",
};

const CreateCategory = () => {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <div className="min-w-[80%] space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
        <CreateCategoryForm />
      </div>
    </div>
  );
};

export default CreateCategory;
