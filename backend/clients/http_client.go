package clients

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"castcreel/backend/config"
)

// HTTPAIClient is the HTTP REST implementation of the AIClient interface.
// It talks to the Python FastAPI service running on port 8000.
// This is the default transport used unless AI_TRANSPORT=grpc is set.
type HTTPAIClient struct {
	baseURL    string
	httpClient *http.Client
}

// NewHTTPAIClient creates a new HTTP client pointed at the Python service URL
// from config. Sets a reasonable timeout so the Go server doesn't hang forever
// waiting for a response from Python if something goes wrong.
func NewHTTPAIClient(cfg *config.Config) (*HTTPAIClient, error) {
	return &HTTPAIClient{
		baseURL: cfg.AIServiceHTTPURL,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}, nil
}

// Predict sends a POST request to the Python service's /predict endpoint
// with the user's location and context, and reads back the prediction response.
func (c *HTTPAIClient) Predict(ctx context.Context, req *PredictionRequest) (*PredictionResponse, error) {
	return nil, fmt.Errorf("not implemented")
}

// DetectFish sends a POST request to the Python service's /vision/detect endpoint
// with the raw image bytes, and reads back the species, color, and condition.
func (c *HTTPAIClient) DetectFish(ctx context.Context, req *DetectFishRequest) (*DetectFishResponse, error) {
	return nil, fmt.Errorf("not implemented")
}

// FetchConditions sends a POST request to the Python service's /conditions endpoint
// with the GPS location and timestamp, and reads back all the environmental data.
func (c *HTTPAIClient) FetchConditions(ctx context.Context, req *ConditionsRequest) (*ConditionsResponse, error) {
	return nil, fmt.Errorf("not implemented")
}

// postJSON is a helper that sends a JSON body to a URL and reads the response
// body back into the provided target struct. Used by all three methods above
// to avoid repeating the marshal/unmarshal dance every time.
func (c *HTTPAIClient) postJSON(ctx context.Context, path string, body interface{}, target interface{}) error {
	return fmt.Errorf("not implemented")
}
