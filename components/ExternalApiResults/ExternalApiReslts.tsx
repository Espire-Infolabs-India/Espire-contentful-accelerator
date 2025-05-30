import { ComponentDataProps } from "@/utils/lib/CommonProps";
import React, { useEffect, useState, startTransition } from "react";
import {Container,Grid,Card,CardContent,Typography,CircularProgress,Alert,Box,} from "@mui/material";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const ExternalApiResults = ({ data }: ComponentDataProps) => {
  const [hydrated, setHydrated] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const api = data?.fields?.externalApi;
  useEffect(() => {
    startTransition(() => {
      setHydrated(true);
    });
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    startTransition(() => {
      setLoading(true);
      const fetchPosts = async () => {
        try {
          const response = await fetch(api);
          if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.status}`);
          }
          const data: Post[] = await response.json();
          startTransition(() => {
            setPosts(data);
          });
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "An unknown error occurred";
          startTransition(() => {
            setError(message);
          });
        } finally {
          startTransition(() => {
            setLoading(false);
          });
        }
      };
      fetchPosts();
    });
  }, [hydrated]);
  if (!hydrated) return null;
  return (
    <Container sx={{ py: 5, bgcolor: "#f8f9fa", borderRadius: "8px" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ my: 4, fontWeight: 600, color: "#333" }}
      >
        Blog Posts
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={3}>
          <CircularProgress sx={{ color: "#0d6efd" }} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ textAlign: "center", mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && posts.length > 0 && (
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} lg={3} key={post.id}>
              <Card sx={{ height: "100%", borderRadius: "12px", boxShadow: 2 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#000" }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.95rem", color: "#555", mt: 1 }}
                  >
                    {post.body}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    backgroundColor: "#f8f9fa",
                    borderTop: "1px solid #ddd",
                    fontSize: "0.85rem",
                    color: "text.secondary",
                    px: 2,
                    py: 1,
                  }}
                >
                  <strong>User ID:</strong> {post?.userId}
                  <strong>Post ID:</strong> {post?.id}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && !error && posts.length === 0 && (
        <Typography align="center" sx={{ color: "text.secondary", mt: 4 }}>
          No posts available.
        </Typography>
      )}
    </Container>
  );
};
export default ExternalApiResults;
