package clients

import (
	"context"
	"fmt"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"castcreel/backend/config"
)

// GRPCAIClient is the gRPC implementation of the AIClient interface.
// It talks to the Python gRPC server running on port 50051.
// This transport is used when AI_TRANSPORT=grpc is set in the environment.
// gRPC is faster and more efficient than REST for high-frequency calls
// but requires generated code from the proto files.
type GRPCAIClient struct {
	conn    *grpc.ClientConn
	address string
}

// NewGRPCAIClient opens a gRPC connection to the Python service address from config.
// The connection is kept open and reused across requests (much more efficient
// than opening a new connection each time, which HTTP/1.1 does by default).
func NewGRPCAIClient(cfg *config.Config) (*GRPCAIClient, error) {
	conn, err := grpc.NewClient(
		cfg.AIServiceGRPCURL,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		// TODO: replace insecure credentials with TLS before production
	)
	if err != nil {
		return nil, fmt.Errorf("could not connect to gRPC AI service: %w", err)
	}

	return &GRPCAIClient{
		conn:    conn,
		address: cfg.AIServiceGRPCURL,
	}, nil
}

// Close shuts down the gRPC connection cleanly. Should be called when the
// server is shutting down so we don't leave dangling connections.
func (c *GRPCAIClient) Close() error {
	return c.conn.Close()
}

// Predict calls the PredictionService.GetPrediction RPC on the Python gRPC server
// and returns the prediction result. The request and response types defined in
// ai_client.go are translated to/from their proto equivalents here.
func (c *GRPCAIClient) Predict(ctx context.Context, req *PredictionRequest) (*PredictionResponse, error) {
	return nil, fmt.Errorf("not implemented")
}

// DetectFish calls the VisionService.DetectFish RPC on the Python gRPC server
// with the raw image bytes and returns the identified species and visual attributes.
func (c *GRPCAIClient) DetectFish(ctx context.Context, req *DetectFishRequest) (*DetectFishResponse, error) {
	return nil, fmt.Errorf("not implemented")
}

// FetchConditions calls the ConditionsService.FetchConditions RPC on the Python
// gRPC server and returns all the environmental data for the given location and time.
func (c *GRPCAIClient) FetchConditions(ctx context.Context, req *ConditionsRequest) (*ConditionsResponse, error) {
	return nil, fmt.Errorf("not implemented")
}
