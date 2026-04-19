import { ImageResponse } from "next/og";
import { COURSES } from "@/lib/courses";

export const alt = "Milestone Academy — Course Details";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mapping for display-friendly diploma codes and level labels
const COURSE_META: Record<
  string,
  { code: string; level: string }
> = {
  "basic-package": { code: "DABS", level: "Level 1" },
  "short-term-tax-software-package": { code: "DUTC", level: "Level 2" },
  "intermediate-package": { code: "PGDAFA", level: "Level 3" },
  "comprehensive-package": { code: "EMDAT", level: "Level 4" },
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);

  const title = course?.title ?? "Diploma Program";
  const meta = COURSE_META[slug] ?? { code: "PROG", level: "Level 1" };
  const duration = course?.duration ?? "3 Months";
  const price = course?.price
    ? `₹${course.price.toLocaleString("en-IN")}`
    : "Contact for Pricing";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background:
            course?.gradient ??
            "linear-gradient(135deg, #0A1A0B, #2D9E44)",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dark overlay for readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(10,26,11,0.92) 40%, rgba(10,26,11,0.6) 100%)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            padding: "60px 64px",
            width: "100%",
          }}
        >
          {/* Level + code badge */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                background: "rgba(45,158,68,0.25)",
                border: "1px solid rgba(45,158,68,0.4)",
                borderRadius: "100px",
                padding: "6px 16px",
                fontSize: "13px",
                color: "#A8F5C2",
                fontFamily: "monospace",
                letterSpacing: "0.15em",
                display: "flex",
              }}
            >
              {meta.level}
            </div>
            <div
              style={{
                background: "rgba(45,158,68,0.15)",
                border: "1px solid rgba(45,158,68,0.3)",
                borderRadius: "100px",
                padding: "6px 16px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#2D9E44",
                fontFamily: "monospace",
                letterSpacing: "0.2em",
                display: "flex",
              }}
            >
              {meta.code}
            </div>
          </div>

          {/* Course title */}
          <div
            style={{
              fontSize: title.length > 45 ? "40px" : "48px",
              fontWeight: 700,
              color: "#F7F9F4",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "800px",
              display: "flex",
            }}
          >
            {title}
          </div>

          {/* Meta */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#2D9E44",
                  fontFamily: "monospace",
                  display: "flex",
                }}
              >
                {duration}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(247,249,244,0.50)",
                  display: "flex",
                }}
              >
                Duration
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#2D9E44",
                  fontFamily: "monospace",
                  display: "flex",
                }}
              >
                {price}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(247,249,244,0.50)",
                  display: "flex",
                }}
              >
                Investment
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "20px",
              borderTop: "1px solid rgba(45,158,68,0.2)",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                color: "rgba(247,249,244,0.40)",
                fontFamily: "monospace",
                display: "flex",
              }}
            >
              milestonefinacademy.info
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(247,249,244,0.35)",
                display: "flex",
              }}
            >
              Milestone Academy · Kerala, India
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
