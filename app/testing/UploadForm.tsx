"use client";

const UploadForm = () => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const target = event.target as HTMLFormElement;
      const data = new FormData(target);

      const res = await fetch("/api/issues", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}
    >
      <input type="file" name="imageFile" />
      <input type="text" name="userText" id="" placeholder="Hello" />
      <input type="number" name="lat" id="" />
      <input type="number" name="lng" id="" />
      <input type="number" name="categoryId" id="" />
      <input type="number" name="userId" id="" />
      <input type="submit" value="Upload" />
    </form>
  );
};

export default UploadForm;
