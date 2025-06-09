import { type NextRequest, NextResponse } from "next/server";

// PDL API base URL
const PDL_API_URL = "https://api.peopledatalabs.com/v5";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const query = searchParams.get("query");

    if (!type || !query) {
      const errorMsg = "Missing required parameters: type and query";
      console.error(errorMsg);
      return NextResponse.json(
        { error: errorMsg },
        { status: 400 }
      );
    }

    // Get API key from environment variable
    const apiKey = process.env.PDL_API_KEY;
    if (!apiKey) {
      const errorMsg = "API key not configured";
      console.error(errorMsg);
      return NextResponse.json(
        { error: errorMsg },
        { status: 500 }
      );
    }

    // Build search parameters based on search type
    let searchParameters: Record<string, string> = {};

    switch (type) {
      case "name":
        searchParameters = { full_name: query };
        break;
      case "email":
        searchParameters = { email: query };
        break;
      case "company":
        searchParameters = { company: query };
        break;
      default:
        const errorMsg = "Invalid search type. Must be full_name, email, or company";
        console.error(errorMsg);
        return NextResponse.json(
          { error: errorMsg },
          { status: 400 }
        );
    }

    // Make request to PDL API
    const response = await fetch(`${PDL_API_URL}/person/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
      },
      body: JSON.stringify({
        query: { bool: { must: [{ term: searchParameters }] } },
        size: 10,
        pretty: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("PDL API error:", errorData);
      return NextResponse.json(
        {
          error: `PDL API error: ${errorData.error?.message || response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Transform the data to a more usable format for our frontend
    const transformedData = (data.data || []).map((person: any) => ({
      full_name: person.full_name || "",
      first_name: person.first_name || "",
      last_name: person.last_name || "",
      email: person.work_email || person.personal_email || person.email || "",
      job_title: person.job_title || "",
      company: person.job_company_name || "",
      location: person.location_name || "",
      linkedin_url: person.linkedin_url ? `https://${person.linkedin_url.replace(/^https?:\/\//, "")}` : null,
      twitter_url: person.twitter_url ? `https://${person.twitter_url.replace(/^https?:\/\//, "")}` : null,
      facebook_url: person.facebook_url ? `https://${person.facebook_url.replace(/^https?:\/\//, "")}` : null,
      github_url: person.github_url ? `https://${person.github_url.replace(/^https?:\/\//, "")}` : null,
      website: person.website || null,
    }));

    // Log the transformed data for debugging
    console.log("API Response (transformed):", JSON.stringify(transformedData, null, 2));

    return NextResponse.json({ data: transformedData });
  } catch (error) {
    console.error("Error in people finder API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
