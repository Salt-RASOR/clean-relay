import clsx from "clsx";
import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import TakeAPhoto from "@/app/public/take_a_photo.svg";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectNewImage,
  selectNewImageURL,
  setNewImageURL,
} from "@/lib/features/newReportSlice";

type FileInputProps = {
  saveFile: (files: File[]) => void;
  hasError: boolean;
};

const FileInput: FC<FileInputProps> = ({ saveFile, hasError }) => {
  const imageFile = useAppSelector(selectNewImage);
  const imageURL = useAppSelector(selectNewImageURL);
  const dispatch = useAppDispatch();

  const onDrop = useCallback(
    (files: File[]) => {
      saveFile(files);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          dispatch(setNewImageURL(event.target.result as string));
        }
      };
      reader.readAsDataURL(files[0]);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [saveFile]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
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
        <input type="file" {...getInputProps()} />

        <div
          className={clsx(
            "flex flex-col items-center justify-center",
            "text-primary-color m-4 p-8 pb-20",
            "",
            hasError ? "outline outline-1 outline-red-500" : "border border-dashed-2 border-gray-400",
            "text-sm text-primary-color",
            "cursor-pointer"
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
                  width={220}
                  height={200}
                  src={imageFile && imageURL ? imageURL : TakeAPhoto}
                  alt="insert your photo here"
                  style={{
                    width: "220px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />

                <p className="mt-2 mb-1">
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
