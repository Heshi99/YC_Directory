import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

export type StartupTypeCard = Omit<Startup, "author"> &{author?:Author}

// Helper function to safely get image URL
const getImageUrl = (image: any): string | null => {
  if (!image) return null;

  try {
    // If it's already a string URL, return it
    if (typeof image === 'string') {
      // Check if it's a valid URL
      if (image.startsWith('http')) {
        return image;
      }
      // If it's just an image reference like 'image-1K8pIbIrhkQ', return null
      return null;
    }

    // If it's a Sanity image object, use urlFor
    if (image && typeof image === 'object' && (image.asset || image._type === 'image')) {
      return urlFor(image).url();
    }

    return null;
  } catch (error) {
    console.warn('Error processing image:', error);
    return null;
  }
};

// Helper function to get user profile image
const getUserImageUrl = (author: any): string => {
  console.log('getUserImageUrl called with:', author);

  if (!author) {
    console.log('No author data, using default placeholder');
    return `https://placehold.co/48x48/png?text=U`;
  }

  // If author has an image and it's a valid URL, use it
  if (author.image && typeof author.image === 'string' && author.image.startsWith('http')) {
    console.log('Using author image URL:', author.image);
    return author.image;
  }

  // Log what we got instead
  console.log('Author image not valid URL:', author.image, typeof author.image);

  // Generate placeholder with first letter of name
  const firstLetter = author.name?.charAt(0)?.toUpperCase() || 'U';
  const placeholderUrl = `https://placehold.co/48x48/png?text=${firstLetter}`;
  console.log('Using placeholder:', placeholderUrl);
  return placeholderUrl;
};
const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="startup-card group ">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>

          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={getUserImageUrl(author)}
            alt={author?.name || "User"}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <Image
          src={getImageUrl(image) || "https://placehold.co/300x164/png?text=Startup"}
          alt={title || "Startup"}
          width={300}
          height={164}
          className="startup-card_img"
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
