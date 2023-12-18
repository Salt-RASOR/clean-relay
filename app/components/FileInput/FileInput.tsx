import clsx from "clsx";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import TakeAPhoto from "../../assets/take_a_photo.svg";

const FileInput = () => {
  const onDrop = useCallback(() => {
    // ToDo Implement photo upload to the backend
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg": [],
      "image/giff": [],
    },
    maxFiles: 10,
    onDrop,
  });

  return (
    <div className="flex justify-center pt-20">
      <form
        {...getRootProps()}
        id="dropzone-wrapper"
        method="post"
        encType="multipart/form-data"
        className={clsx(
          isDragAccept && "bg-drag_accepted_files",
          isDragReject && "bg-drag_rejected_files"
        )}>
        <input type="file" {...getInputProps()} />

        <div
          className={clsx(
            "flex flex-col items-center justify-center",
            "text-primary-color m-4 p-8",
            "border border-dashed border-gray-400",
            "text-sm text-primary-color"
          )}>
          <div className="h-[200px] min-w-[200px] font-semibold text-center">
            {isDragActive ? (
              <>
                {isDragAccept && <p>All files will be accepted</p>}
                {isDragReject && <p>Some files will be rejected</p>}
              </>
            ) : (
              <>
                <Image
                  width={200}
                  height={200}
                  src={TakeAPhoto}
                  alt="insert your photo here"
                />
                <p className="mb-2 ">
                  <span>Click to upload</span> or drag and drop
                </p>
                <p className="font-normal text-xs">SVG, PNG, JPG or GIF</p>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FileInput;
