import { issuesIcons } from "../../common/contants";
import Image from "next/image";

type IssuePinProps = {
  category: number;
  status: number;
};
const IssuePin: React.FC<IssuePinProps> = ({ category, status }) => {
  const getCategoryIcon = (categoryId: number) => {
    const foundCategory = issuesIcons.find((icon) => icon.id === categoryId);
    return foundCategory ? foundCategory.icon : null;
  };

  const getBackgroundColor = (statusId: number) => {
    switch (statusId) {
      case 1:
        return "bg-red-400";
      case 2:
        return "bg-lime-500";
      default:
        return "";
    }
  };

  const categoryIcon = getCategoryIcon(category);
  const bgColor = getBackgroundColor(status);

  if (categoryIcon) {
    return (
      <div className={`${bgColor} w-[30px]`}>
        <Image
          src={categoryIcon}
          alt={`Marker for category ${category}`}
          width={30}
          height={30}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default IssuePin;
