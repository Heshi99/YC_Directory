// View.tsx (Server Component)
import { STARTUP_VIEWS_QUERIES } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { writeClient } from "@/sanity/lib/write-client";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERIES, { id });

  // Update views asynchronously (fire-and-forget)
  writeClient
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit()
    .catch((err) => console.error("Failed to update views:", err));

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
