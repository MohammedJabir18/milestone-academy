import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Milestone Academy — India's Premier Accounting & Finance Academy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Load logo image as base64
  const logoData = await readFile(
    join(process.cwd(), "public/logos/milestone-logo-dark.png")
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  // Load Syne Bold font
  let syneBoldData: ArrayBuffer | null = null;
  try {
    const fontFile = await readFile(
      join(process.cwd(), "public/fonts/Syne-Bold.ttf")
    );
    syneBoldData = fontFile.buffer.slice(
      fontFile.byteOffset,
      fontFile.byteOffset + fontFile.byteLength
    ) as ArrayBuffer;
  } catch {
    // Font not found — fallback to system font
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          background:
            "linear-gradient(135deg, #0A1A0B 0%, #132015 50%, #0A2810 100%)",
          overflow: "hidden",
          fontFamily: syneBoldData ? "Syne" : "Arial, sans-serif",
        }}
      >
        {/* Large decorative M watermark */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "-20px",
            transform: "translateY(-50%)",
            fontSize: "480px",
            fontWeight: 800,
            color: "rgba(45, 158, 68, 0.08)",
            lineHeight: 1,
            display: "flex",
          }}
        >
          M
        </div>

        {/* Green glow orb — right side */}
        <div
          style={{
            position: "absolute",
            right: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(45,158,68,0.22) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Main content — left 65% */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 0 60px 64px",
            width: "780px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <img
            src={logoBase64}
            width={200}
            height={44}
            style={{ objectFit: "contain", objectPosition: "left" }}
            alt="Milestone Academy"
          />

          {/* Headline */}
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "0px",
            }}
          >
            <div
              style={{
                fontSize: "52px",
                fontWeight: 700,
                color: "#F7F9F4",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                display: "flex",
              }}
            >
              Master the Language of
            </div>
            <div
              style={{
                fontSize: "58px",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#2D9E44",
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
                display: "flex",
              }}
            >
              Business.
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: "18px",
              fontSize: "17px",
              color: "rgba(247,249,244,0.55)",
              letterSpacing: "0.06em",
              fontFamily: "monospace",
              display: "flex",
              textTransform: "uppercase" as const,
            }}
          >
            {"INDIA'S PREMIER ACCOUNTING & FINANCE ACADEMY"}
          </div>

          {/* Stats row */}
          <div
            style={{
              marginTop: "28px",
              display: "flex",
              gap: "40px",
              alignItems: "center",
            }}
          >
            {[
              { value: "4,800+", label: "Students" },
              { value: "96%", label: "Placement" },
              { value: "4", label: "Diploma Levels" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#2D9E44",
                    fontFamily: "monospace",
                    display: "flex",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "rgba(247,249,244,0.50)",
                    display: "flex",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — diploma codes */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: "60px",
            gap: "16px",
            position: "relative",
            zIndex: 10,
            flex: 1,
          }}
        >
          {["EMDAT", "PGDAFA", "DUTC", "DABS"].map((code, i) => (
            <div
              key={code}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "10px",
              }}
            >
              {i > 0 && (
                <div
                  style={{
                    width: "80px",
                    height: "1px",
                    background: "rgba(45,158,68,0.2)",
                    display: "flex",
                    alignSelf: "flex-end",
                    marginBottom: "4px",
                  }}
                />
              )}
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#A8F5C2",
                  letterSpacing: "0.25em",
                  fontFamily: "monospace",
                  display: "flex",
                }}
              >
                {code}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "52px",
            borderTop: "1px solid rgba(45,158,68,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 64px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: "15px",
              color: "rgba(247,249,244,0.45)",
              fontFamily: "monospace",
              letterSpacing: "0.04em",
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
            Kerala, India
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: syneBoldData
        ? [
            {
              name: "Syne",
              data: syneBoldData,
              style: "normal" as const,
              weight: 700 as const,
            },
          ]
        : [],
    }
  );
}
