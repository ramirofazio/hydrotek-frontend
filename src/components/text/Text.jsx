import { Trans } from "react-i18next";
import { twMerge } from "tailwind-merge";

export const Text = ({ content, Tag = "p", className, literal, values, components, children, ...props }) => {
  return (
    <Tag className={twMerge("whitespace-pre-wrap text-white", className)} {...props}>
      {literal ? content : <Trans {...{ values, components }} i18nKey={content} />}
      {children}
    </Tag>
  );
};
