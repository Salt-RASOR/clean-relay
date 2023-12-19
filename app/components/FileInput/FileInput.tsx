import clsx from "clsx";
import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import TakeAPhoto from "../../assets/take_a_photo.svg";

type FileInputProps = {
  onChange: (event: React.ChangeEvent) => void;
};

const FileInput: FC<FileInputProps> = ({ onChange }) => {
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
      "image/bmp": [],
      "image/webp": [],
      "image/avif": [],
    },
    maxFiles: 1,
  });

  return (
    <div className="flex justify-center pt-20">
      <div
        {...getRootProps()}
        id="dropzone-wrapper"
        className={clsx(
          isDragAccept && "bg-drag_accepted_files",
          isDragReject && "bg-drag_rejected_files"
        )}
      >
        <input type="file" {...getInputProps()} onChange={onChange} />

        <div
          className={clsx(
            "flex flex-col items-center justify-center",
            "text-primary-color m-4 p-8",
            "border border-dashed border-gray-400",
            "text-sm text-primary-color"
          )}
        >
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
      </div>
    </div>
  );
};

export default FileInput;
