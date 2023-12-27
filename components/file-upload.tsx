"use client";
import React from "react";
import { UploadDropzone } from "@/lib/uploadThing";
import { X } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";
import useCustomToast from "@/app/hooks/useToast";
import axios from "axios";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endPoint: "messageFile" | "serverImage";
}

const FileUpload = ({ onChange, value, endPoint }: FileUploadProps) => {
  const { showToast } = useCustomToast();
  const fileType = value?.split(".").pop();

  const deleteFile = async (url: string) => {
    try {
      await axios.delete("api/uploadthing", {
        data: {
          url,
        },
      });
      showToast("Image sucessfully deleted");
      onChange("");
    } catch (err) {
      console.log(err);
      showToast("Error deleting image", "destructive");
    }
  };

  if (value && fileType !== "pdf") {
    return (
      <div className="relative w-20 h-20">
        <Image src={value} fill alt="Upload" className="rounded-full" />
        <button
          onClick={() => deleteFile(value)}
          className="absolute top-0 right-0 "
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      onUploadError={(err: Error) => {
        console.log(err);
      }}
    />
  );
};

export default FileUpload;
