<?php

namespace Tolerance\Viewer\Neo4j;

use Neoxygen\NeoClient\Client;
use Neoxygen\NeoClient\Request\Response;
use Tolerance\MessageProfile\MessageProfile;
use Tolerance\Viewer\Inspection;
use Tolerance\Viewer\InspectionRequest;
use Tolerance\Viewer\Inspector;

class Neo4jInspector implements Inspector
{
    /**
     * @var Client
     */
    private $client;

    /**
     * @param Client $client
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * {@inheritdoc}
     */
    public function inspect(InspectionRequest $request): Inspection
    {
        $query =
            'MATCH (parent:Message {identifier: {messageIdentifier}})-[:PARENT_MESSAGE*0..]-(message:Message) '.
            'OPTIONAL MATCH (message)<-[received:RECEIVED_MESSAGE]-(p:Peer) '.
            'OPTIONAL MATCH (message)-[sent:SENT_MESSAGE]-(sender:Peer) '.
            'OPTIONAL MATCH (message)-[:PARENT_MESSAGE*1]->(directParent:Message) '.
            'WITH message, count(p) AS c, collect(p) AS peers, sender, collect(received) as receivedCollection, sent, directParent '.
            'RETURN message, sender, head(receivedCollection) AS received, sent, directParent AS parent, '.
            'CASE c WHEN 1 THEN peers[0] ELSE head(filter(x in peers where x.virtual IS NULL)) END AS receiver '.
            'ORDER BY received.start ASC'
        ;

        $response = $this->getResponse(
            $this->client->sendCypherQuery($query, [
                'messageIdentifier' => (string) $request->getMessageIdentifier(),
            ])
        );

        $profiles = array_map(function(array $row) {
            return $this->createProfile($row);
        }, $response);

        return new Inspection($profiles);
    }

    /**
     * @param Response $response
     *
     * @return array
     */
    private function getResponse(Response $response)
    {
        $result = $response->getBody()['results'][0];
        $columns = $result['columns'];

        $rows = array_map(function(array $data) use ($columns) {
            return $this->createRow($columns, $data['row']);
        }, $result['data']);

        return $rows;
    }

    /**
     * @param array $columns
     * @param array $cypherRow
     *
     * @return array
     */
    private function createRow(array $columns, array $cypherRow)
    {
        $row = [];

        foreach ($columns as $index => $columnName) {
            $row[$columnName] = $cypherRow[$index];
        }

        return $row;
    }

    /**
     * @param array $row
     *
     * @return MessageProfile
     */
    private function createProfile(array $row)
    {
        return Neo4jProfile::fromQueryResult($row);
    }
}
